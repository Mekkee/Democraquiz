import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result(props)
{
  return (
    <ReactCSSTransitionGroup
    className="container result"
    component="div"
    transitionName="fade"
    transitionEnterTimeout={800}
    transitionLeaveTimeout={500}
    transitionAppear
    transitionAppearTimeout={500}
  >
    <div>
      <p>Du föredrar en, <strong>{props.quizResult}</strong>!</p>
    </div>
  </ReactCSSTransitionGroup>
  );
}

Result.propTypes = 
{
  quizResult: PropTypes.string.isRequired,
};

export default Result;
