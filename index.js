import { BrowserBarcodeReader } from '@zxing/library/esm';

const codeReader = new BrowserBarcodeReader();
const videoElement = document.querySelector('video');
let videoInputDevices;
let rearCameraDeviceId;

const _getRearCameraDeviceId = devices => {
  let rearCameraDevice = devices[0];

  for (const device of devices) {
    if (/back|rear|environment/gi.test(device.label)) {
      rearCameraDevice = device;
      break;
    }
  }
  return rearCameraDevice.id;
};

const _onDecode = result => {
  if (result) {
      console.info('decode result', result.text);
  }
}

const startScaning = async () => {
  codeReader.reset();
  return codeReader
    .decodeFromInputVideoDeviceContinuously(
      rearCameraDeviceId,
      videoElement,
      _onDecode,
    )
    .catch(err => {
      //this._dispatchCustomEvent('permission-denied');
      console.error(err);
    });
};

const init = async () => {
  try {
    if (!rearCameraDeviceId) {
        videoInputDevices = await codeReader.listVideoInputDevices();
        rearCameraDeviceId = _getRearCameraDeviceId(videoInputDevices);
    }
    await startScaning();
  } catch (err) {
    console.error(err);
  }
}

init();