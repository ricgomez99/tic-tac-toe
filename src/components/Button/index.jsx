export default function Button({ reset }) {
  const handleClick = () => {
    reset()
  }
  return <button onClick={handleClick}>Reset</button>
}
