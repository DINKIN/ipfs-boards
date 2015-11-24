var React = require('react')
var Markdown = require('markdown.jsx')
var Icon = require('icon.jsx')
var Clock = require('clock.jsx')

module.exports = function(boardsAPI){
  var UserID = require('userID.jsx')(boardsAPI)
  return React.createClass({
    getInitialState: function(){
      return { moment: false }
    },
    componentDidMount: function(){
      require.ensure(['moment'],_ => {
        if(this.isMounted()) this.setState({ moment: require('moment') })
      })
    },
    render: function(){
      if(this.props.comment){
        var Comments = this.props.comment.comments || require('comments.jsx')(boardsAPI)
        return <div className="comment"><hr/>
          <div className="icons">
            <UserID id={this.props.comment.op} />
            <Clock date={this.props.comment.date} />
          </div>
          <Markdown source={this.props.comment.text} />
          <Comments className="shifted" parent={this.props.comment.hash} adminID={this.props.adminID} board={this.props.board}/>
        <hr/></div>
      } else {
        return <div><hr/>Invalid Comment<hr/></div>
      }
    }
  })
}