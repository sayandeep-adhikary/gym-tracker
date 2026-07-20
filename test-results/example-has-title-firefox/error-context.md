# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> has title
- Location: tests\example.spec.ts:3:1

# Error details

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\v-saadhikary\AppData\Local\ms-playwright\firefox-1532\firefox\firefox.exe -no-remote -headless -profile C:\Users\V-SAAD~1\AppData\Local\Temp\playwright_firefoxdev_profile-AWGdfK -juggler-pipe -silent
<launched> pid=21836
[pid=21836][err] *** You are running in headless mode.
[pid=21836][err] JavaScript warning: resource://services-settings/Utils.sys.mjs, line 119: unreachable code after return statement
[pid=21836][out] 
[pid=21836][out] Juggler listening to the pipe
[pid=21836][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=2.5122) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt
[pid=21836][err] JavaScript error: chrome://juggler/content/Helper.js, line 82: NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIWebProgress.removeProgressListener]
```