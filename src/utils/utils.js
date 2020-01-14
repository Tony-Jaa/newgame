/**
 * 获取url参数
 * @param {string}} variable 
 */
export const getQueryVariable = (variable, query) => {
  let vars = query.split("&");
  for (let i=0; i<vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

export default {
  getQueryVariable,
}