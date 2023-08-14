import Link from "next/link";;

export default function CreateNewButton(props) {
    const {buttonColor, buttonURL, buttonText} = props;

    return(
        <Link className={`btn ${buttonColor} btn-sm rounded-pill`} href={buttonURL}>
            {buttonText}
        </Link>
    )
}