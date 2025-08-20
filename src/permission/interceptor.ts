const chooseImageInterceptor = {
  invoke(e) {
    console.log('拦截chooseImage')
    console.log('------------------------------')
    console.log(e)
    console.log('------------------------------')
    uni.showToast({
      title: '拦截chooseImage',
      icon: 'none',
    })
    // return false
  },
}
// const getLocationInterceptor = {
//   invoke() {
//     console.log('拦截chooseImage')
//     uni.showToast({
//       title: '拦截getLocation',
//       icon: 'none',
//     })
//     // return false
//   },
// }
export const permissionInterceptor = {
  install() {
    uni.addInterceptor('chooseImage', chooseImageInterceptor)
    // uni.addInterceptor('getLocation', getLocationInterceptor)
  },
}
