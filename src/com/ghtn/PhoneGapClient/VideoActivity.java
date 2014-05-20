package com.ghtn.PhoneGapClient;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.view.KeyEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.widget.Toast;
import com.uniview.airimos.Player;
import com.uniview.airimos.listener.OnStartLiveListener;
import com.uniview.airimos.manager.ServiceManager;
import com.uniview.airimos.parameter.StartLiveParam;
import com.uniview.airimos.service.KeepaliveService;
import com.uniview.airimos.thread.RecvStreamThread;

/**
 * User: Administrator
 * Date: 2014/5/7
 * Time: 11:11
 */
public class VideoActivity extends Activity implements KeepaliveService.OnKeepaliveListener {

    private SurfaceView surfaceView;

    private Player player;

    private boolean mBound = false;
    private KeepaliveService mService = null;
    private boolean mRequireLogout = false;

    private RecvStreamThread mRecvStreamThread = null;

    private static final String TAG = "VideoActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.video);

        //SurfaceView用于渲染
        surfaceView = (SurfaceView) findViewById(R.id.surface_view);

        //监听SurfaceView的变化
        surfaceView.getHolder().addCallback(new surfaceCallback());


        //初始化一个Player对象
        player = new Player();
        player.AVInitialize(surfaceView.getHolder());

        //启动实况的结果监听
        OnStartLiveListener listener = new OnStartLiveListener() {
            @Override
            public void onStartLiveResult(long errorCode, String errorDesc, String playSession) {
                //将播放会话设给Player
                player.setPlaySession(playSession);

                //如果已经在播放，则先停掉
                if (mRecvStreamThread != null) {
                    player.AVStopPlay();
                    mRecvStreamThread.interrupt();
                    mRecvStreamThread = null;
                }

                //启动播放解码
                player.AVStartPlay();

                //收流线程启动
                mRecvStreamThread = new RecvStreamThread(player, playSession);
                mRecvStreamThread.start();
            }

        };


        //设置启动实况的参数
        StartLiveParam p = new StartLiveParam();
        p.setCameraCode(getIntent().getStringExtra("resourceId"));
        p.setUseSecondStream(true); //使用辅流
        p.setBitrate(64 * 8);   //64KB的码率
        p.setFramerate(25);     //25帧率
        p.setResolution(2);     //4CIF分辨率

        //启动实况
        ServiceManager.startLive(p, listener);

    }

    @Override
    protected void onStart() {
        //启动保活服务。若不想用提供的保活服务类，可通过每十秒调用保活接口ServiceManager.keepalive实现保活
        if (!mBound) {
            Intent intent = new Intent(this, KeepaliveService.class);
            startService(intent);
            bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
        }

        super.onStart();
    }

    @Override
    protected void onStop() {
        //解除保活服务的绑定
        if (mBound) {
            unbindService(mConnection);
            mBound = false;

            if (mRequireLogout) {
                Intent serviceIntent = new Intent(VideoActivity.this, KeepaliveService.class);
                stopService(serviceIntent);
            }
        }

        super.onStop();
    }

    @Override
    protected void onDestroy() {
        //销毁Player
        if (null != player) {
            player.AVFinalize();
        }

        //退出登录，一般在用户手动退出时调用，这里只作演示
        ServiceManager.logout(null);
        super.onDestroy();
    }

    @Override
    public void onKeepaliveFailed() {
        mRequireLogout = true;
        Toast.makeText(VideoActivity.this, "保活失败，已退出", Toast.LENGTH_LONG).show();
        finish();
    }

    class surfaceCallback implements SurfaceHolder.Callback {

        public void surfaceCreated(SurfaceHolder holder) {
            Log.d(TAG, "===== surfaceCreated =====");
        }

        public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
            Log.d(TAG, "===== surfaceChanged =====");
            if (player != null) {
                player.changeDisplaySize(width, height);
            }

        }

        @Override
        public void surfaceDestroyed(SurfaceHolder arg0) {
            Log.d(TAG, "===== surfaceDestroyed =====");
        }
    }

    private ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName className, IBinder service) {
            KeepaliveService.KeepaliveBinder binder = (KeepaliveService.KeepaliveBinder) service;
            mService = binder.getService();
            mService.start(VideoActivity.this);
            mBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName arg0) {
            mBound = false;
        }
    };

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
//            Toast.makeText(this,"1111111", Toast.LENGTH_LONG).show();
            //停止实况，第二个参数是null表示不接收结果
            ServiceManager.stopLive(player.getPlaySession(), null);


            //收流线程退出
            if (mRecvStreamThread != null) {
                mRecvStreamThread.interrupt();
            }


            if (null != player) {
                //停止Player播放解码
                player.AVStopPlay();

                //销毁Player
                player.AVFinalize();
            }

            Intent intent = new Intent();
            intent.setClass(VideoActivity.this, ResourceListActivity.class);
            startActivity(intent);
        }

        return true;
    }
}
