import ImagePicker from 'react-native-image-crop-picker';

export default async function ImagePickerHelper(opts={
    width: 300, height: 400, cropping:true, writeTempFile: true,multiple: true
}) {
    const toBeReturned = {status: true, data: undefined};
    
    await ImagePicker.openPicker({
        width: opts.width,
        height: opts.height,
        cropping: opts.cropping,
        writeTempFile: opts.writeTempFile,
        multiple: opts.multiple,
        
      }).then(image => {
          if (Array.isArray(image)) {
            toBeReturned['data'] = [];
            image.map(singleImage => {
                toBeReturned['data'] = [...toBeReturned['data'], singleImage];
            })
          }
          else {
            toBeReturned['data'] = mage;
          }
      }).catch(err => {
        console.log(err)
        toBeReturned['status'] = false;
      });
    
      return toBeReturned;
}