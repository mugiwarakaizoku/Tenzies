export default function Dice(props) {
  const styles = {
    backgroundColor: props.change ? "white" : "#59E391"
  };
  return (
    <div className="dice" style={styles} onClick={props.clickFn}>
      {props.value}
    </div>
  );
}
