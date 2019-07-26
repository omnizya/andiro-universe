//TODO: Use import instead of require
const request = require('request')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const requestUrl = 'https://simpl-recherche.tax.gov.ma/RechercheEntreprise/result'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
const setFormValues = (ice, type = 'ICE') => {
  return `param['criteria']=${ice}&param['type']=${type}`
}
// const dataString = 'param["criteria"]=001609783000007&param["type"]=ICE'
/*
var options = {
    url: requestUrl,
    method: 'POST',
    headers: headers,
    body: dataString
};
*/
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      //  console.log(body);
        const dom = new JSDOM(body);
        var mCrit = dom.window.document.getElementsByClassName("panel-body")[1]
        //console.log(mCrit.innerHTML)
      let userName = mCrit.getElementsByTagName('input')[0].value
      let activity = mCrit.getElementsByTagName('input')[1].value
        console.info("name : ", userName)
        console.info("Activity : ", mCrit.getElementsByTagName('input')[1].value)
        console.info("ICE : ", mCrit.getElementsByTagName('input')[2].value)
        console.info("IF : ", mCrit.getElementsByTagName('input')[3].value)
      console.info("Address : ", mCrit.getElementsByTagName('input')[6].value)
      let dataInJson = {
        name: userName,
        activity: activity,
        ice:mCrit.getElementsByTagName('input')[2].value,
        if: mCrit.getElementsByTagName('input')[3].value,
        address: mCrit.getElementsByTagName('input')[6].value
      }
      return dataInJson
    }
}

const getAeByIce = (ice) => {
  let dataString = `param["criteria"]=${ice}&param["type"]=ICE`
  let options = {
    url: requestUrl,
    method: 'POST',
    headers: headers,
    body: dataString
};
  request(options, callback);
}

const getAeByIf = (if) => {
  let dataString = `param["criteria"]=${if}&param["type"]=IF`
  let options = {
    url: requestUrl,
    method: 'POST',
    headers: headers,
    body: dataString
};
  request(options, callback);
}

const getByComRegisteryId = (rc, registery) => {

}
//request(options, callback)
