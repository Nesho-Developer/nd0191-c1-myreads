import { Fragment } from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../components/BookDetails";

const Details = () => {
  const { id } = useParams<string>();

  return (
    <Fragment>
      <BookDetails id={id? id : 'none'} />
    </Fragment>
  );
};
export default Details;
