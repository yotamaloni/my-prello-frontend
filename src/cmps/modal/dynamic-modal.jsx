import React from 'react'
import { connect } from 'react-redux'

import { setModal } from '../../store/board.action.js'

import { MembersModal } from './members-modal.jsx'
import { LabelsModal } from './labels-modal.jsx'
import { ChecklistModal } from './checklist-modal.jsx'
import { DateModal } from './date-modal.jsx'
import { AttachmentModal } from './attachment-modal.jsx'
import { CoverModal } from './cover-modal.jsx'
import { RemoveModal } from './remove-modal.jsx'
import { InviteToBoardModal } from './invite-to-board-modal.jsx'
import { CreateBoardModal } from './crate-board-modal.jsx'

function _DynamicModal(props) {
    const { modal } = props

    switch (modal.type) {
        case 'members':
            return <MembersModal className='dynamic-modal'
                {...props}
            />;
        case 'labels':
            return <LabelsModal className='dynamic-modal'
                {...props}
            />;
        case 'checklist':
            return <div>IN BUILD</div>
        case 'date':
            return <DateModal className='dynamic-modal'
                {...props}
            />;
        case 'attachment':
            return <div>IN BUILD</div>
        case 'cover':
            return <CoverModal className='dynamic-modal'
                {...props}
            />;
        case 'remove':
            return <RemoveModal className='dynamic-modal'
                {...props}
            />;
        case 'invite':
            return <InviteToBoardModal className='dynamic-modal'
                {...props}
            />;
        case 'create-board':
            return <CreateBoardModal className='dynamic-modal'
                {...props}
            />;
        default:
            return <div>NOT FOUND</div>;
    }
}

function mapStateToProps({ boardModule }) {
    return {
        modal: boardModule.modal
    }
}

const mapDispatchToProps = {
};


export const DynamicModal = connect(mapStateToProps, mapDispatchToProps)(_DynamicModal)

