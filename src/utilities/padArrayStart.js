export default function padArrayStart(arr, len, fill) {
  return Array(len - arr.length)
    .fill(fill)
    .concat(arr)
}
