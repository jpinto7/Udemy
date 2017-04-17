import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Thumbnail = styled.div`
  width: 300px;
`;

const EmployeeDetail = ({ employee }) => {
  const { avatar, email, name, phone } = employee;
  return (
    <Thumbnail className="thumbnail">
      <img src={avatar} alt={name} />
      <div className="caption">
        <h3>{name}</h3>
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      </div>
    </Thumbnail>
  );
};

EmployeeDetail.propTypes = {
  employee: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default EmployeeDetail;
