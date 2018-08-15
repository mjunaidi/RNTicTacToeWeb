import React from 'react'
import { View,Text,StyleSheet, } from 'react-native'
import Mark from './Mark'
import SimpleButton from '../components/SimpleButton'
import * as Color from '../utils/Color'
import * as GameUtil from './GameUtil'

const CPU = 'CPU'
const EMPTY = '\u200B'
const DELAY = 200

export default class Board extends React.Component {
  state={}
  componentDidMount() {
    const players = {
      p1: {
        id: 'p1',
        name: 'P1',
        //title: '\u00D7',
        //title: '\u2A09',
        //title: '\u2573',
        title: '\u2715',
        color: Color.BLUE,
      },
      cpu: {
        id: 'cpu',
        name: CPU,
        title: '\u20DD',
        //title: '\u25EF',
        color: Color.RED,
      }
    }
    const stats = {
      win: 0,
      lose: 0,
      draw: 0,
    }
    this.setState({
      players: players,
      stats: stats,
      count: 0,
    }, this.setup)
  }
  setup() {
    const players = this.state.players
    const emptyGrid = {
      title: EMPTY,
      color: Color.GREEN,
    }
    const board = [
      [emptyGrid, emptyGrid, emptyGrid],
      [emptyGrid, emptyGrid, emptyGrid],
      [emptyGrid, emptyGrid, emptyGrid],
    ]
    this.setState({
      current: players.p1,
      board: board,
      message: 'Try to win!',
      init: true,
      over: false,
    })
  }
  restart=()=>{
    this.setState((prevState,props)=>({
      count: prevState.count+1,
    }), this.setup)
  }
  mark(i,j) {
    if (this.state.over) {
      this.setState({message:'Restart?'})
    } else {
      this.setState((prevState,props)=>{
        const board = prevState.board
        if (board[i][j].title===EMPTY) {
          board[i][j] = prevState.current
          return {
            board: board,
          }
        }
        return null
      }, ()=>{
        // calling check right away might seems unresponsive if next turn is cpu's
        setTimeout(()=>{
          this.check()
        }, 0)
      })
    }
  }
  check() {
    const players = this.state.players
    const current = this.state.current
    const board = this.state.board

    const marked = []
    board.map((row,i)=>{
      row.map((col,j)=>{
        if (col.title === current.title) {
          marked.push({y:i,x:j})
        }
      })
    })

    // check is current player is winning
    const winning = GameUtil.isWinning(marked)
    if (winning) {
      const message =  `${current.name} wins!`
      this.setState({message:message,over:true}, ()=>{
        this.setState((prevState,props)=>{
          const stats = prevState.stats
          if (current.name===CPU) stats.lose++
          else stats.win++
          return {
            stats: stats,
          }
        })
      })
      return
    } else if (marked.length === 5) {// if all selected, means it's a draw
      const message = 'It\'s a draw.'
      this.setState({message:message,over:true}, ()=>{
        this.setState((prevState,props)=>{
          const stats = prevState.stats
          stats.draw++
          return {
            stats: stats,
          }
        })
      })
    } else {
      this.changeTurn()
    }
  }
  changeTurn() {
    this.setState((prevState,props)=>{
      const players = prevState.players
      const names = Object.keys(players)
      const nextTurn = names.find(e=>e!==prevState.current.id)
      const current = players[nextTurn]
      return {
        current: current,
      }
    }, ()=>{
      // if current turn is cpu, trigger autoMove
      if (this.state.current.name===CPU) {
        setTimeout(()=>{
          this.autoMove()
        }, DELAY)
      }
    })
  }
  autoMove() {
    const players = this.state.players
    const board = this.state.board

    // get unmarked grid
    const choices = []
    board.forEach((row,i)=>{
      row.forEach((col,j)=>{
        if (col.title === EMPTY) choices.push({r:i,c:j})
      })
    })

    // check which com should mark;
    // 1) check any could make a win, or
    // 2) to prevent lose, or
    // 3) random
    let cIndex
    for (let c in choices) {
      const entry = choices[c]

      // deep clone board for testing
      const clonedBoard = JSON.parse(JSON.stringify(board))
      clonedBoard[entry.r][entry.c] = players.cpu

      const markedTmp = []
      clonedBoard.forEach((row,i)=>{
        row.forEach((col,j)=>{
          if (col.title === players.cpu.title) markedTmp.push({y:i,x:j})
        })
      })
      if (GameUtil.isWinning(markedTmp)) {
        cIndex = c
        break
      }
    }

    // or prevent p1 from winning
    if (!cIndex) {
      for (let c in choices) {
        const entry = choices[c]

        // deep clone board for testing
        const clonedBoard = JSON.parse(JSON.stringify(board))
        clonedBoard[entry.r][entry.c] = players.p1

        const cMarkedTmp = []
        clonedBoard.forEach((row,i)=>{
          row.forEach((col,j)=>{
            if (col.title === players.p1.title) cMarkedTmp.push({y:i,x:j})
          })
        })
        if (GameUtil.isWinning(cMarkedTmp)) {
          cIndex = c
          break
        }
      }
    }

    // or else set randomly
    if (!cIndex) cIndex = Math.floor(Math.random() * choices.length)

    // mark for cpu
    this.mark(choices[cIndex].r,choices[cIndex].c)
  }
  render() {
    if (this.state.init) {
      const players = this.state.players
      const board = this.state.board
      return (
        <View>
          <View style={styles.mb3}>
          </View>
          <View style={styles.mb3}>
            <Text style={styles.text}>{this.state.message}</Text>
          </View>
          <View style={styles.mb3}>
            <View style={{
              flex: 1, flexDirection: 'row', justifyContent: 'center',
            }}>
              <Text style={styles.text}>W: {this.state.stats.win}</Text>
              <Text style={[styles.text,{
                marginLeft: 30,
                marginRight: 30,
              }]}>D: {this.state.stats.draw}</Text>
              <Text style={styles.text}>L: {this.state.stats.lose}</Text>
            </View>
          </View>
          <View style={styles.mb3}>
            {
              board.map((row,i)=>(
                <View key={i} style={{
                  flex: 1, flexDirection: 'row', justifyContent: 'center',
                }}>
                  {
                    row.map((col,j)=>(
                      <Mark key={j} {...col}
                        onPress={()=>{
                          this.mark(i,j)
                        }}
                      />
                    ))
                  }
                </View>
              ))
            }
          </View>
          <View>
            <SimpleButton
              title="Restart"
              btnColor={Color.YELLOW}
              outline
              style={{
                margin: 10,
                width: 100,
                alignSelf: 'center'
              }}
              onPress={this.restart}
            />
          </View>
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    //fontFamily: 'Snell Roundhand',
    fontFamily: 'Futura-CondensedMedium',
    textAlign: 'center',
  },
  mb3: {
    marginBottom: 30,
  },
})
