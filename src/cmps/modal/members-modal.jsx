import React from 'react'

import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import DoneIcon from '@mui/icons-material/Done';

import { MemberIcon } from '../../cmps/member-icon.jsx'
import { ModalHeader } from './modal-header.jsx'


class _MembersModal extends React.Component {
    state = {
        membersToShow: [...this.props.board.members],
        txt: '',
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            ...prevState, [field]: value
        }));
        this.submit(value)
    };

    submit = (value) => {
        const txt = value
        const membersToShow = this.props.board.members.filter((member) => {
            return (member.fullname.toLowerCase().includes(txt.toLowerCase())
                ||
                member.username.toLowerCase().includes(txt.toLowerCase()))
        })
        this.setState({ membersToShow })
    };


    toggleMemberToTask = (member) => {
        const { board, task } = this.props
        let taskMembers = task.members
        const isMemberInTask = taskMembers?.find(taskMember => taskMember._id === member._id) ? true : false
        if (isMemberInTask) {
            taskMembers = taskMembers.filter(taskMember => taskMember._id !== member._id)
        } else {
            if (taskMembers) taskMembers.push(member)
            else taskMembers = [member]
        }
        task.members = taskMembers
        this.props.updateBoard({ ...board },{...task})
    }

    render() {
        const { task, modal, closeModal } = this.props
        const { txt } = this.state
        const membersIds = task?.members?.map((member) => member._id) || []
        const { membersToShow } = this.state
        return (
            < section className='modal members-modal'>
                <ModalHeader modal={modal} closeModal={closeModal} />
                <div className='search-members'>
                    <input className='search-members-input'
                        placeholder='Search members'
                        type='text'
                        onChange={this.handleChange}
                        autoComplete='off'
                        name='txt'
                        value={txt} />
                </div>
                <h4>Board members</h4>
                <div className='board-members'>
                    <ul className='members-list clean-list'>
                        {membersToShow.map((member) => {
                            return <li onClick={() => {
                                this.toggleMemberToTask(member)
                            }} className='member' key={member._id}>
                                <div className='flex default-gap'>
                                    <MemberIcon member={member} size={32} />
                                    <span>{`${member.fullname}  (${member.username})`}</span>
                                </div>
                                {membersIds.includes(member._id) &&
                                    <div className='vi'><DoneIcon /></div>
                                }
                            </li>
                        })}
                    </ul>
                </div>
            </ section>

        )
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        modal: boardModule.modal
    }
}

const mapDispatchToProps = {
    updateBoard
};


export const MembersModal = connect(mapStateToProps, mapDispatchToProps)(_MembersModal)


