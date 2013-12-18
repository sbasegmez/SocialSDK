/*
 * � Copyright IBM Corp. 2013
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */

/**
 * MoveToTrashWidget
 */
define([ "sbt/declare", "sbt/lang", "sbt/dom", 
         "sbt/i18n!./nls/files", "sbt/controls/view/BaseDialogContent", "../../FileService", 
		 "sbt/text!./templates/MoveToTrash.html" ],
		function(declare, lang, dom, nls, BaseDialogContent, FileService, MoveToTrash) {

	/**
	 * Widget which can be used to move a collection of files to trash.
	 * 
	 * @class MoveToTrashWidget
	 * @namespace sbt.connections.controls.files
	 * @module sbt.connections.controls.forums.MoveToTrashWidget
	 */
	var MoveToTrashWidget = declare([ BaseDialogContent ], {
		
		/**
		 * Template used to display the  content.
		 */
		templateString : MoveToTrash,
		
		/**
		 * Computed message displayed in the move to trash dialog.
		 */
		moveToTrashMessage : "",
		
		/**
		 * Constructor method for the UploadFileWidget.
		 * 
		 * @method constructor
		 * @param args
		 */
		constructor : function(args) {
			this.nls = lang.mixin({}, nls, this.nls);

			lang.mixin(this, args);
		},

		/**
		 * Return the FileService.
		 */
		getFileService : function() {
			if (!this.fileService) {
				var args = this.endpoint ? { endpoint : this.endpoint } : {};
				this.fileService = new FileService(args);
			}
			return this.fileService;
		},
		
		/**
		 * Called after properties have been set
		 */
		postMixInProperties: function() {
			this.errorMessage = nls.moveToTrashError;
			this.successMessage = nls.moveToTrashSuccess;
			this._setMoveToTrashMessage(this.files);
		},
				
		/**
		 * Post create function is called after section has been created.
		 * 
		 * @method postCreate
		 */
		postCreate : function() {
			this.inherited(arguments);
			
			if (!this.files || !this.files.length) {
				this.setExecuteEnabled(false);
			} 
		},

		/**
		 * Called when the execute button is clicked.
		 * 
		 * @method onExecute
		 */
		onExecute : function() {
			//TODO Check some files have been selected
			//if(files && files.length > 0){
				//this._moveToTrash(files);
			
		},

		//
		// Internals
		//
			
		/*
		 * Create a new folder
		 */
		_moveToTrash : function(files) {
			var self = this;
			this.setExecuteEnabled(false);
			var fileService = this.getFileService();
			for (var i=0;i<files.length;i++) {
				files[i] = fileService.newFile(files[i]);
				var id = files[i].data.uid;
				fileService.getFile(id, {}).then(
		            function(file) {						
						var context = self;
						fileService.deleteFile(file.getFileId()).then(
							function(updatedFile) {
								context.onSuccess();									
							}, 
							function(error) {
								context.onError();		
							}
						);
		            },
		            function(error) {
		                console.log(error);
		            }       
		    	);
				context.setExecuteEnabled(true);
			}
		},
		
		/*
		 * Set the move to trash message
		 */
		_setMoveToTrashMessage : function(files) {
			if (!files) {
				this.moveToTrashMessage = "";
			} else if (files.length == 1) {
				this.moveToTrashMessage = nls.labelMoveFile;					
			} else {
				this.moveToTrashMessage = nls.labelMoveFiles;
			}
		}
		
	});

	return MoveToTrashWidget;
});