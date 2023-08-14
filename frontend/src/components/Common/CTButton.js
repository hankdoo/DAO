import { Button } from "react-bootstrap";

const CTButton = (props) => {
  const { className, variant, onClick, text } = props;
  return (
    <Button className={className} variant={variant} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CTButton;
