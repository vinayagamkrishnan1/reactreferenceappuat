If you are getting error like below, follow below documentation

You can try some of the following options:
       - changing the IDE settings.
       - changing the JAVA_HOME environment variable.
       - changing `org.gradle.java.home` in `gradle.properties`.

or 

[error]Error: /Users/runner/work/1/s/android/gradlew failed with return code: 1

https://github.com/microsoft/appcenter/issues/2067
https://docs.microsoft.com/en-us/appcenter/build/troubleshooting/build-failed
https://intercom.help/appcenter/en/articles/1298548-my-build-failed-what-do-i-do

Go to Appcenter -> Select app -> Build configuration -> Environment variables -> JAVA_HOME = $(JAVA_HOME_11_X64)

