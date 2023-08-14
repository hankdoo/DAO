import Link from "next/link";;
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const CreateNewButton = () => {
    return(
        <>
            <div className="create-new-button">
                <OverlayTrigger placement="left" 
                    delay={{ show: 250, hide: 400 }} 
                    overlay={
                        <Tooltip id="CreateNewID" >
                            Create New NFT
                        </Tooltip>
                    }
                >
                    <Link 
                        className="shadow-lg btn btn-warning" 
                        href="/create-new"
                    >
                        <i className="fz-18 bi bi-plus-lg" />
                    </Link>
                </OverlayTrigger>
            </div>
        </>
    )
}

export default CreateNewButton;