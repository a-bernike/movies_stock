import React from 'react';

const Home = React.lazy(() => import('views/containers/Home'));
const Detail = React.lazy(() => import('views/containers/Detail'));

const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/movie/:id', exact: true, name: 'Detail', component: Detail}
]

export default routes;