define(['react', 'jsx!components/CommentList', 'jsx!components/CommentForm'], function(React, CommentList, CommentForm) {
    var CommentBox = React.createClass({
        render: function() {
            console.log(this.props.data);
            return (
                <div className="commentBox">
                    <h1>Comments</h1>
                    <CommentList data={this.props.data} />
                    <CommentForm />
                </div>
            );
        }
    });

    return CommentBox;
});

