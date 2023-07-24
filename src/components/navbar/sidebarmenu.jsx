import { faChartSimple, faComments, faBullseye } from '@fortawesome/free-solid-svg-icons'
const sidebar_menu = [
    {
        id: 1,
        icon: faChartSimple,
        path: '/admin/chat',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: faComments,
        path: '/admin/community',
        title: 'Community',
    },
    {
        id: 3,
        icon: faBullseye,
        path: '/admin/alert',
        title: 'Alert',
    },
]

export default sidebar_menu;