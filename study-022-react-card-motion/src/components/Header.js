import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export default function Header(){
  return (
      <header>
        <h1>Hogwarts</h1>
        <FontAwesomeIcon icon={faBars} />
      </header>
  )
}
