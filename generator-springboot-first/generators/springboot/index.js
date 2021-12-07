var Generator = require('yeoman-generator');

const _defaultProjectName = 'app';
const _defaultProjectType = 'java';

const _replaceSpacesWithDash = input =>
  (input || _defaultProjectName).trim()
    .replace(/\./g, '_')
    .replace(/\W+/g, '-');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        // this.config.save();
        // Next, add your custom code
        //this.option('babel'); // This method adds support for a `--babel` flag

        // this.helperFunction = function(){
        //     console.log('won\'t be called automatically');
        // };
        this.projectTypes = [
            'maven',
            'gradle'
        ]
    }
    initializing(){
        this.log("inbitializing the generator .....");
        this.props = {
            projectDirectory: _defaultProjectName,
            projectType: _defaultProjectType,
          };
    }

    async prompting(){
        this.inputs = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter application name:",
                default: this.props.projectDirectory
            },
            {
                type: "list",
                name: "projectType",
                message: "Which build tool you need (maven/gradle)?",
                choices: this.projectTypes
            }
        ]);
        this.props.projectDirectory = _replaceSpacesWithDash(this.inputs.name);
        this.props.projectType = this.inputs.projectType.trim().toLowerCase();

        this.log("Project name : " + this.inputs.name);
        this.log("Build tool : " + this.inputs.build);
    }

    writing() {

        /* safety */
        // this.props.projectDirectory = _replaceSpacesWithDash(this.props.projectDirectory);
        // this.props.projectType = this.props.projectType.trim().toLowerCase();

        /* copy project files by type */
        // **/*, **/.*
        [
          '**/*',
          '**/.*',
    
        ].forEach(pattern => this.fs.copy(
          this.templatePath(`${this.props.projectType}/${pattern}`),
          this.destinationPath(this.props.projectDirectory),
        ));
    
      }

};