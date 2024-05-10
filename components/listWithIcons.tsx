import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ListWithIcons = ({ items }) => {
  return (
    <div className="p-4">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-start mb-6">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-cyan-400 mt-1 mr-2"
            />
            <div>
              <h3 className="text-cyan-600 font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListWithIcons;
