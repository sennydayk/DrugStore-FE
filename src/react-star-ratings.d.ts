declare module "react-star-ratings" {
  import * as React from "react";

  interface StarRatingsProps {
    rating: number;
    starRatedColor?: string;
    starEmptyColor?: string;
    starHoverColor?: string;
    starDimension?: string;
    starSpacing?: string;
    changeRating?: (newRating: number, name: string) => void;
    numberOfStars?: number;
    name?: string;
  }

  class StarRatings extends React.Component<StarRatingsProps> {}

  export = StarRatings;
}
