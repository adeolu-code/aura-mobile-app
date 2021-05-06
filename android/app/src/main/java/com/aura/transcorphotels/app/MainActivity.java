package com.aura.transcorphotels.app;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.security.ProviderInstaller;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity implements ProviderInstaller.ProviderInstallListener {
  private static final int ERROR_DIALOG_REQUEST_CODE = 1;

  private boolean retryProviderInstall;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    ProviderInstaller.installIfNeededAsync(this, this);
  }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Aura";
  }

  @Override
  public void onProviderInstalled() {

  }

  @Override
  public void onProviderInstallFailed(int errorCode, Intent recoveryIntent) {
    GoogleApiAvailability availability = GoogleApiAvailability.getInstance();
    if (availability.isUserResolvableError(errorCode)) {
      // Recoverable error. Show a dialog prompting the user to
      // install/update/enable Google Play services.
      availability.showErrorDialogFragment(
              this,
              errorCode,
              ERROR_DIALOG_REQUEST_CODE,
              new DialogInterface.OnCancelListener() {
                @Override
                public void onCancel(DialogInterface dialog) {
                  // The user chose not to take the recovery action
                  onProviderInstallerNotAvailable();
                }
              });
    } else {
      // Google Play services is not available.
      onProviderInstallerNotAvailable();
    }
  }

  private void onProviderInstallerNotAvailable() {
    // This is reached if the provider cannot be updated for some reason.
    // App should consider all HTTP communication to be vulnerable, and take
    // appropriate action.
  }
}
