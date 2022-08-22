import { Fragment } from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../components/BookDetails";

const Details = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <BookDetails id={id} />
    </Fragment>
  );
};
export default Details;
