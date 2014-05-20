package com.ghtn.PhoneGapClient;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.*;
import com.uniview.airimos.listener.OnLoginListener;
import com.uniview.airimos.listener.OnQueryResourceListener;
import com.uniview.airimos.manager.ServiceManager;
import com.uniview.airimos.obj.QueryCondition;
import com.uniview.airimos.obj.ResourceInfo;
import com.uniview.airimos.parameter.LoginParam;
import com.uniview.airimos.parameter.QueryResourceParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * User: Administrator
 * Date: 2014/5/7
 * Time: 9:16
 */
public class ResourceListActivity extends Activity implements OnLoginListener, AdapterView.OnItemClickListener {

    private ListView listView;

    private SimpleAdapter simpleAdapter;
    private List<Map<String, Object>> dataList;

    private static final String TAG = "ResourceListActivity";

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.resource_list);

        listView = (ListView) findViewById(R.id.resourceList);

        // 设置登录参数
        LoginParam params = new LoginParam();
        params.setServer("58.242.43.42");
        params.setPort(52060);
        params.setUserName("12345");
        params.setPassword("123456");

        //调用登录接口
        ServiceManager.login(params, ResourceListActivity.this);

    }

    @Override
    public void onLoginResult(long errorCode, String errorDesc) {

        //成功为0，其余为失败错误码
        if (errorCode == 0) {

            //查询资源参数
            QueryResourceParam params = new QueryResourceParam("", "", new QueryCondition(0, 100, false));//查询开始位置0，查询数量100，是否遍历查询子组织

            //查询资源结果监听
            OnQueryResourceListener listener = new OnQueryResourceListener() {
                @Override
                public void onQueryResourceResult(long errorCode, String errorDesc, List<ResourceInfo> resList) {
                    if (null == resList) {
                        return;
                    }

                    initDataList();

                    StringBuffer strBuf = new StringBuffer();
                    int size = resList.size();
                    for (int i = 0; i < size; i++) {
                        strBuf.append(resList.get(i).getResCode() + ","); // 资源编码
                        strBuf.append(resList.get(i).getResName() + ",");  // 资源 名称
                        strBuf.append(resList.get(i).getResType() + ","); //摄像机：1001，组织：1
                        strBuf.append(resList.get(i).getResSubType() + ","); //固定摄像机：1; 云台摄像机：2; 高清固定摄像机：3; 高清云台摄像机：4; 车载摄像机：5; 不可控标清摄像机：6; 不可控高清摄像机：7;
                        strBuf.append(resList.get(i).getIsOnline() + "\n");


                        Map<String, Object> map = new HashMap<String, Object>();
                        map.put("resourceId", resList.get(i).getResCode());
                        map.put("resourceName", resList.get(i).getResName());
                        map.put("resourceType", resList.get(i).getResType());
                        map.put("resourceOnline", resList.get(i).getIsOnline());

                        dataList.add(map);
                    }

                    dataListChanged();

                    listView.setOnItemClickListener(ResourceListActivity.this);

                    Log.d(TAG, strBuf.toString());

                }
            };

            //查询资源接口调用
            ServiceManager.queryResource(params, listener);
        } else {
            Toast.makeText(ResourceListActivity.this, "登录失败：" + errorCode + "," + errorDesc, Toast.LENGTH_LONG).show();

        }
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        String resourceId = ((TextView) view.findViewById(R.id.resourceId)).getText().toString();
        int resourceType = Integer.parseInt(((TextView) view.findViewById(R.id.resourceType)).getText().toString());
        boolean resourceOnline = Boolean.parseBoolean(((TextView) view.findViewById(R.id.resourceOnline)).getText().toString());
//        Toast.makeText(ResourceListActivity.this,"id = " + resourceId, Toast.LENGTH_LONG).show();

        if (resourceType == ResourceInfo.ResType.CAMERA && resourceOnline) {
            // 如果是摄像机并且在线,跳转到播放界面
//            Toast.makeText(ResourceListActivity.this, "播放", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent();
            intent.putExtra("resourceId", resourceId);
            intent.setClass(ResourceListActivity.this, VideoActivity.class);
            startActivity(intent);
        } else if (resourceType == ResourceInfo.ResType.ORG) {
            // 如果是组织，查询子列表
            //查询资源参数
            QueryResourceParam params = new QueryResourceParam(resourceId, "", new QueryCondition(0, 100, false));//查询开始位置0，查询数量100，是否遍历查询子组织


            //查询资源结果监听
            OnQueryResourceListener listener = new OnQueryResourceListener() {
                @Override
                public void onQueryResourceResult(long errorCode, String errorDesc, List<ResourceInfo> resList) {
                    if (null == resList) {
                        return;
                    }

                    initDataList();

                    StringBuffer strBuf = new StringBuffer();
                    int size = resList.size();
                    for (int i = 0; i < size; i++) {
                        strBuf.append(resList.get(i).getResCode() + ","); // 资源编码
                        strBuf.append(resList.get(i).getResName() + ",");  // 资源 名称
                        strBuf.append(resList.get(i).getResType() + ","); //摄像机：1001，组织：1
                        strBuf.append(resList.get(i).getResSubType() + ","); //固定摄像机：1; 云台摄像机：2; 高清固定摄像机：3; 高清云台摄像机：4; 车载摄像机：5; 不可控标清摄像机：6; 不可控高清摄像机：7;
                        strBuf.append(resList.get(i).getIsOnline() + "\n");


                        Map<String, Object> map = new HashMap<String, Object>();
                        map.put("resourceId", resList.get(i).getResCode());
                        map.put("resourceName", resList.get(i).getResName());
                        map.put("resourceType", resList.get(i).getResType());
                        map.put("resourceOnline", resList.get(i).getIsOnline());

                        dataList.add(map);
                    }

                    dataListChanged();

                    listView.setOnItemClickListener(ResourceListActivity.this);

                    Log.d(TAG, strBuf.toString());

                }
            };

            //查询资源接口调用
            ServiceManager.queryResource(params, listener);
        }

    }

    private void initDataList() {
        if (dataList == null) {
            dataList = new ArrayList<Map<String, Object>>();
        } else {
            dataList.clear();
        }
    }

    private void dataListChanged() {
        if (simpleAdapter != null && listView.getAdapter() != null) {
            // 把数据变更的情况告知数据适配器
            simpleAdapter.notifyDataSetChanged();
        } else {
            simpleAdapter = new SimpleAdapter(ResourceListActivity.this,
                    dataList,
                    R.layout.list_item,
                    new String[]{"resourceId", "resourceName", "resourceType", "resourceOnline"},
                    new int[]{R.id.resourceId, R.id.resourceName, R.id.resourceType, R.id.resourceOnline});

            listView.setAdapter(simpleAdapter);
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            Intent intent = new Intent();
            intent.putExtra("page", "file:///android_asset/www/index2.html");
            intent.setClass(ResourceListActivity.this, MainActivity.class);
            startActivity(intent);
        }

        return true;
    }
}

