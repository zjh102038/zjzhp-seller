const verify = (Vue, option) => {
  const { classSuccess, classError, eventType = 'blur' ,customValidRules} = option;
  let eventFn = function (el,modifiers) {
    let res = Object.keys(modifiers).map(item=>{
      let target = modifiersList.find(val=>{
        return val.modifiers === item
      });
      if(target){
        return {
          flag:target.valFn(el.value),
          msg:target.msg
        }
      }else{
        return {
          flag:false,
          msg:'不支持此验证规则'
        }
      }
    })
    let flag = res.every(item=>item.flag);
    console.log(res)
    let errorList = res.filter(item=>!item.flag);
    if(errorList.length>0){
      Vue.prototype.$message.error(errorList[0].msg)
    }
    if (!flag) {
      el.classList.add(classError)
    } else {
      el.classList.remove(classError)
    }
  }
  let defaultModifiers = [
    {
      modifiers:'string',
      msg:'必须是字符串类型',
      valFn:function(value){
        return typeof(value) === 'string'
      }
    },
    {
      modifiers:'must',
      msg:'请输入店铺名称',
      valFn:function(value){
        return value.trim() != ''
      }
    }
  ]
  let modifiersList = [...customValidRules,...defaultModifiers];
  // Vue.prototype.$message.success('成功')
  Vue.directive('verify', {
    bind(el,binding) {
      let {modifiers} = binding;
      el.addEventListener(eventType, () => {
        eventFn.apply(this,[el,modifiers])
      })
    },
    unbind(el){
      el.removeEventListener(eventType,eventFn)
    }
  })
}
export default verify;