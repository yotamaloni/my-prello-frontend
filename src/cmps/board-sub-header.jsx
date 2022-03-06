import React from 'react'

import { connect } from 'react-redux'

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

import { setModal } from '../store/board.action.js'

import { MembersList } from '../cmps/members-list.jsx'
import { DynamicModal } from '../cmps/modal/dynamic-modal.jsx'

function _BoardSubHeader(props) {


    const onSetModal = (modalType) => {
        props.setModal(modalType)
    }
    const { toggleFilterModal, board, onToggleBoardStar, modal } = props
    const starColor = board.isStarred ? 'gold' : '#FFF'

    return (
        <section className='board-sub-header'>
            <div className='flex left-menu'>
                <div className="sub-nav-btn">Board</div>
                <p className=' sub-nav-btn board-title'>{board.title}</p>

                {board.isStarred ?
                    <StarRateIcon className="sub-nav-btn star"
                        onClick={onToggleBoardStar}
                        style={{ color: 'gold' }} />
                    :
                    <StarBorderOutlinedIcon className="sub-nav-btn star"
                        onClick={onToggleBoardStar}
                        style={{ color: starColor }} />
                }

                <MembersList />
                <div className='invite-btn clickable' onClick={() =>
                    onSetModal({ type: 'invite' })}>
                    <GroupAddOutlinedIcon /><span>Invite</span>
                    {modal?.type === 'invite' && <React.Fragment>
                        < DynamicModal
                            modal={'invite'}
                            closeModal={() => onSetModal(null)}
                        />
                    </React.Fragment>}
                </div>

            </div>

            <div className='flex right-menu'>
                <div className='flex default-gap sub-nav-btn' onClick={() => { toggleFilterModal() }}>
                    <FilterListOutlinedIcon />
                    <div className='txt-in-btn'>Filter</div>
                </div>
                <div className='flex default-gap sub-nav-btn'>
                    <MoreHorizOutlinedIcon />
                    <div className='txt-in-btn'>Show menu</div>
                </div>
            </div>

        </section>
    )
}

function mapStateToProps({ boardModule }) {
    return {
        modal: boardModule.modal,
    }
}

const mapDispatchToProps = {
    setModal,
};

export const BoardSubHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardSubHeader)
