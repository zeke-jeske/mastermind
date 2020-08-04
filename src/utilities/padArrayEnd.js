export default function padArrayEnd(arr, len, fill) {
  return arr.concat(Array(len - arr.length).fill(fill))
}
