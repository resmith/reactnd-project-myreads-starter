import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// e.g. <Button title="Add Book" path={'/search'} cName="open-search" />
// const Button = ({ title, path, cName }) => (
//   <Route render={({ history }) => (
//     <div className={cName}>
//       <a onClick={() => { history.push(path); }} >
//         {title}
//       </a>
//     </div>
//   )}
//   />
// );

class Button extends React.Component {
  render() {
    const { title, path, cName } = this.props;

  return (
    <Route render={({ history }) => (
      <div className={cName}>
        <a className={cName} onClick={() => { history.push(path); }} >
          {title}
        </a>
      </div>
    )}
    />
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  cName: PropTypes.string.isRequired,
};

export default Button;
