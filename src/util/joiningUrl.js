export default function joiningUrl(url,params)
{
  let newParams = Object.values(params)?.join('&')
  return url+newParams
}