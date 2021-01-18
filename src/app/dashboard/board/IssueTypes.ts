import {
    faBolt,
    faBookmark,
    faBug,
    faCheckSquare,
    faPlusSquare,
    faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

const issueTypes = [
    { type: 'Epic', icon: faBolt },
    { type: 'Task', icon: faCheckSquare },
    { type: 'User story', icon: faBookmark },
    { type: 'New feature', icon: faPlusSquare },
    { type: 'Bug', icon: faBug },
    { type: 'Issue', icon: faQuestionCircle }
];

export default issueTypes;
