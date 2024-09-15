import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className={'pizza-block'}
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="137" cy="129" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="320" rx="15" ry="15" width="280" height="88" />
    <rect x="95" y="416" rx="24" ry="24" width="182" height="45" />
    <rect x="0" y="426" rx="10" ry="10" width="65" height="30" />
  </ContentLoader>
);
