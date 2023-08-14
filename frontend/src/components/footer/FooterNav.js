import Link from "next/link";;

export default function FooterNav(props) {
    const {navList} = props;

    const footerNavItems = navList.map((ele, index) => 
        <li key={index}>
            <Link href={ele.link} >
                {ele.title}
            </Link>
        </li>
    )
    return(
        <div className="footer-nav">
            <ul className="mb-0 d-flex flex-wrap justify-content-center list-unstyled">
                {footerNavItems}
            </ul>
        </div>
    )
}