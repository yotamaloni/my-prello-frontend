import { MemberIcon } from '../member-icon.jsx'

export function TaskMembers({ taskMembers }) {
    return (
        <section className='task-members info-child'>
            <h3 className='labels-title'>Members</h3>
            <ul className='members-display clean-list'>
                {taskMembers.map(member => {
                    return <li key={member._id}> <MemberIcon key={member._id} member={member} size={32} /></li>
                })
                }
            </ul>
        </section >
    )
}
