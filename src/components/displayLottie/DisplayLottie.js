import React, {Component, Suspense} from "react";
import Lottie from "lottie-react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

export default class DisplayLottie extends Component {
  render() {
    const animationData = this.props.animationData;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Lottie
          animationData={defaultOptions.animationData}
          loop={defaultOptions.loop}
        />
      </Suspense>
    );
  }
}
