plugins {
    alias(libs.plugins.androidApplication)
}

android {
    namespace = "com.example.equinox2"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.equinox2"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {

    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    testImplementation(libs.junit)
    implementation ("com.github.krokyze:ucropnedit:2.2.6-2")
   // implementation ("com.yalantis:ucrop:2.2.7")
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}