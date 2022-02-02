
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add';

import { loadBoard, updateBoard } from '../store/board.action.js'
import { socketService } from '../services/socket.service.js'

import { AppHeader } from '../cmps/app-header.jsx'
import { BoardSubHeader } from '../cmps/board-sub-header.jsx'
import { TaskDetails } from '../cmps/task-details.jsx'
import { SideMenu } from '../cmps/side-menu.jsx'
import { AddList } from '../cmps/add-list.jsx'
import { BoardGroupList } from '../cmps/board-group-list.jsx'
import { BoardFilter } from '../cmps/board-filter.jsx'



class _BoardDetails extends React.Component {
    state = {
        isMenuOpen: '',
        isAddListOpen: '',
        isFilterModalOpen: ''

    }

    componentDidMount() {
        const { boardId } = this.props.match.params;
        this.props.loadBoard(boardId)

        socketService.emit('board-watch', boardId)
        socketService.on('board-update', board => {
            this.props.loadBoard(board._id)
        })
    }

    componentDidUpdate(prevProps) {
        const { boardId } = this.props.match.params;
        if (prevProps.filterBy !== this.props.filterBy) {
            this.props.loadBoard(boardId)
            console.log('updated')
        }
    }

    componentWillUnmount() {
        socketService.off('board-update')
    }

    onToggleMenuModal = () => {
        const isMenuOpen = this.state.isMenuOpen ? '' : 'open'
        this.setState({ isMenuOpen })
    }

    onToggleFilterModal = () => {
        const isFilterModalOpen = this.state.isFilterModalOpen ? '' : 'open'
        this.setState({ isFilterModalOpen })
    }

    onToggleAddList = () => {
        const isAddListOpen = this.state.isAddListOpen ? '' : 'open'
        this.setState({ isAddListOpen })
    }

    onToggleBoardStar = () => {
        const { board } = this.props
        const isStarred = board.isStarred ? false : true
        board.isStarred = isStarred
        this.props.updateBoard({ ...board })
    }

    render() {
        const loader = require('../img/loader.gif')
        const { isMenuOpen, isAddListOpen, isFilterModalOpen } = this.state
        const { board, updateBoard } = this.props
        if (!board) return <div className='loader-page'><img className='loader' src={loader} /></div>
        const { groups } = board

        if (!board.title) return <div className='loader-page'><img className='loader' src={loader} /></div>
        const imgUrl = board.style.imgUrl || ''
        const backgroundColor = board.style.backgroundColor || '#29CCE5'

        return (
            <section className="board-details"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundColor: backgroundColor
                }} >
                <AppHeader isBoardDetails={true} />
                <BoardSubHeader board={board} toggleMenuModal={this.onToggleMenuModal}
                    toggleFilterModal={this.onToggleFilterModal}
                    onToggleBoardStar={this.onToggleBoardStar} />
                <div className='overflow-container'>
                    <div className='group-container flex default-gap'>

                        <BoardGroupList
                            groups={groups}
                            updateBoard={updateBoard}
                            boardId={board._id}
                        />

                        {!isAddListOpen ?
                            <React.Fragment>

                                <div className='list-composer'>
                                    <button className='add-list-btn  list-composer' onClick={this.onToggleAddList}>
                                        <span>
                                            <AddIcon fontSize="small"></AddIcon>
                                        </span>
                                        <span>
                                            Add another list
                                        </span>
                                    </button>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div className='list-composer'>
                                    <AddList board={board} boardId={board._id} onToggleAddList={this.onToggleAddList} />
                                </div>
                            </React.Fragment>
                        }
                    </div>
                    {isMenuOpen &&
                        <div className={`side-menu ${isMenuOpen}`} >
                            <SideMenu toggleMenuModal={this.onToggleMenuModal} />
                        </div>
                    }
                    {isFilterModalOpen &&
                        <div className='filter-menu'>
                            <BoardFilter toggleFilterModal={this.onToggleFilterModal} boardId={board._id} />
                        </div>
                    }

                    <Route path={`/board/:boardId/:groupId/:taskId`} component={TaskDetails} />

                </div>
            </section>
        )
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board
    }
}

const mapDispatchToProps = {
    loadBoard,
    updateBoard
};


export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)

