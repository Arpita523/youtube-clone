
const convertRawToString = (labelVale, isSub=false) => {
  // console.log(labelVale)
  const num = Math.abs(Number(labelVale));

  if(num >=1.0e+9){
    return (num / 1.0e+9).toFixed(0) + "B";
  }
  if(num >=1.0e+6){
    return (num / 1.0e+6).toFixed(0) + "M";
  }
  if(num >=1.0e+3){
    return (num / 1.0e+3).toFixed(isSub ? 2 : 0) + "K";
  }
  return num.toString();

}

export default convertRawToString
