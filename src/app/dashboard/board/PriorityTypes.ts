import {
    faAngleDoubleDown,
    faAngleDoubleUp,
    faBan,
    faExclamationTriangle,
    faLongArrowAltDown,
} from '@fortawesome/free-solid-svg-icons';

const priorityTypes = [
    { type: 'Major', icon: faAngleDoubleUp },
    { type: 'Critical', icon: faExclamationTriangle },
    { type: 'Blocker', icon: faBan },
    { type: 'Minor', icon: faAngleDoubleDown },
    { type: 'Trivial', icon: faLongArrowAltDown }
];

export default priorityTypes;