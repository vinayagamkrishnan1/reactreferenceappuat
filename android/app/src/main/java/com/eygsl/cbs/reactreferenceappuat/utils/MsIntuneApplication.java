package com.eygsl.cbs.reactreferenceappuat.utils;

import android.app.Application;

import com.microsoft.intune.mam.client.app.MAMComponents;
import com.microsoft.intune.mam.policy.MAMEnrollmentManager;

/**
 * Created by Vinayagam.
 */

public class MsIntuneApplication extends Application {

    @Override
    public void onCreate() {

        super.onCreate();
        MAMEnrollmentManager mgr = MAMComponents.get(MAMEnrollmentManager.class);
        // mgr.registerAccountForMAM("email","Client id","redirect url");
    }
}
