import universal from 'react-universal-component';

const LandingPage = universal(() => import('./App'), {
  loading: () => 'loading',
});

export default () => (
  <div><LandingPage /></div>
);
