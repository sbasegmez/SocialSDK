/*
 * � Copyright IBM Corp. 2012
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

package nsf.playground.servlets;

import nsf.playground.beans.DataAccessBean;
import nsf.playground.environments.PlaygroundEnvironment;

import com.ibm.commons.runtime.Context;
import com.ibm.sbt.jslibrary.SBTEnvironment;
import com.ibm.xsp.sbtsdk.servlets.ToolkitServlet;

public class PlaygroundToolkitServlet extends ToolkitServlet {

	private static final long serialVersionUID = 1L;

	public PlaygroundToolkitServlet() {
	}
	
    protected SBTEnvironment getDefaultEnvironment(Context context) {
		DataAccessBean dataAccess = DataAccessBean.get();
		String envName = context.getHttpRequest().getHeader("x-env");
		//String envName = (String)FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("environment");
		PlaygroundEnvironment env = dataAccess.getCurrentEnvironment(envName);
		env.prepareEndpoints();
		return env;
    }	

}
