import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostArticle = (props) => {
	return(
		<div className="post_article_container">
			<div className="article_title">Article Title</div>
			<input 
				className="input_article_title" 
				type="text" 
				name="article_title" 
				placeholder='今天天氣好晴朗' 
				onChange={ (e) => props.handleArticleTitle(e) }
			/>
			<div className="article_content">Content</div>
			<textarea 
				className="input_article_content" 
				name="article_content" 
				placeholder='說說心裡話'
				onChange={ (e) => props.handleArticleContent(e) }
			></textarea>
			<select className="article_tag_select"
				onChange={ (e) => props.handleArticleTag(e) }
			>
				<option value="表特">表特</option>
				<option value="八卦">八卦</option>
				<option value="就可">就可</option>
				<option value="生活">生活</option>
			</select>
			<button 
				className='post_article_button'
				type='button' 
				onClick={() => props.handlePostArticle()}>Post Article</button>
		</div>
	);
};

PostArticle.propTypes = { 
	handleArticleTitle: PropTypes.func,
	handleArticleContent: PropTypes.func,
	handleArticleTag: PropTypes.func,
	handlePostArticle: PropTypes.func
}; 

export default PostArticle;