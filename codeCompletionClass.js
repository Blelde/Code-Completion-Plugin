public class GitHubCodeCompletion extends CompletionProposalComputer {
    private static final String[] API_ENDPOINTS = { "users/{username}", "repos/{owner}/{repo}", "issues/{owner}/{repo}/{issue_number}" };
    private static final String[] MARKDOWN_KEYWORDS = { "bold", "italic", "link", "image" };

    @Override
        // TODO: Code completion logic
        public List<ICompletionProposal> computeCompletionProposals(ContentAssistInvocationContext context, IProgressMonitor monitor) {
            List<ICompletionProposal> proposals = new ArrayList<ICompletionProposal>();
            
            // Get the current text selection and document
            IDocument document = context.getDocument();
            int offset = context.getInvocationOffset();
            
            // Check if we're in a GitHub API endpoint or Markdown document
            if (isGitHubApiEndpoint(document, offset)) {
                // Get a list of GitHub API endpoints from the GitHub API
                List<String> apiEndpoints = getGitHubApiEndpoints();
                
                // Add each API endpoint to the proposal list
                for (String endpoint : apiEndpoints) {
                    proposals.add(new CompletionProposal(endpoint, offset, 0, endpoint.length(), null, endpoint, null, null));
                }
            } else if (isMarkdownDocument(document)) {
                // Get a list of GitHub-specific Markdown tags
                List<String> markdownTags = getGitHubMarkdownTags();
                
                // Add each tag to the proposal list
                for (String tag : markdownTags) {
                    proposals.add(new CompletionProposal(tag, offset, 0, tag.length(), null, tag, null, null));
                }
            }
            
            return proposals;
        
        }

    @Override
    public List<IContextInformation> computeContextInformation(ContentAssistInvocationContext context, IProgressMonitor monitor) {
        // TODO: Context information logic
        List<IContextInformation> contextInfoList = new ArrayList<IContextInformation>();
    
    // Get the current text selection and document
    IDocument document = context.getDocument();
    int offset = context.getInvocationOffset();
    
    // Check if we're in a GitHub API endpoint or Markdown document
    if (isGitHubApiEndpoint(document, offset)) {
        // Get the context information for the current API endpoint
        IContextInformation contextInfo = new ContextInformation("GitHub API Endpoint", "Provides context information for GitHub API endpoints");
        contextInfoList.add(contextInfo);
    } else if (isMarkdownDocument(document)) {
        // Get the context information for the current Markdown tag
        IContextInformation contextInfo = new ContextInformation("GitHub Markdown Tag", "Provides context information for GitHub-specific Markdown tags");
        contextInfoList.add(contextInfo);
    }
    
    return contextInfoList;
    }
}