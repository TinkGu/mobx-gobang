/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Modal.css'

export default function Modal({
    show = false,
    children,
}) {
    const style = show ? { display: 'block' } : { display: 'none' }
    return (
        <div className="modal-bg" style={style}>
            {children}
        </div>
    )
}

export function ReplayTip({
    turn = 'black',
    onReplay,
}) {
    return (
        <div>
            <p className="modal-tip">{`${turn} win`}</p>
            <p className="replay-tip" onClick={onReplay}>Replay</p>
        </div>
    )
}

export function NextTurnTip({
    turn = 'black'
}) {
    return <p className="modal-tip">{`${turn} now`}</p>
}
