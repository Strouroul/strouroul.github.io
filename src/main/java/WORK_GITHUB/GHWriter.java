/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package WORK_GITHUB;
 
import java.io.IOException;

/**
 *
 * @author RAMEZ
 */
public class GHWriter {
    
    /*
  public static void main(String[] args) {
    try {
        new GHWriter().writeFile("test_two.txt", "test content");
    } catch (IOException e) {
        e.printStackTrace();
    }
}
 
//https://gist.github.com/Detelca/2337731
public boolean writeFile(String fileName, String fileContent) throws IOException{
    // initialize github client
    GitHubClient client = new GitHubClient();
    //TextView password = (TextView)findViewById(R.id.textViewPassword);
    client.setCredentials("username", "password");

    // create needed services
    RepositoryService repositoryService = new RepositoryService();
    CommitService commitService = new CommitService(client);
    DataService dataService = new DataService(client);

    // get some sha's from current state in git
    Repository repository =  repositoryService.getRepository("username", "repositoryName");
    String baseCommitSha = repositoryService.getBranches(repository).get(0).getCommit().getSha();
    RepositoryCommit baseCommit = commitService.getCommit(repository, baseCommitSha);
    String treeSha = baseCommit.getSha();

    // create new blob with data
    Blob blob = new Blob();
        blob.setContent("[\"" + System.currentTimeMillis() + "\"]").setEncoding(Blob.ENCODING_UTF8);
    String blob_sha = dataService.createBlob(repository, blob);
    Tree baseTree = dataService.getTree(repository, treeSha);

    // create new tree entry
    TreeEntry treeEntry = new TreeEntry();
    treeEntry.setPath("testfile.txt");
    treeEntry.setMode(TreeEntry.MODE_BLOB);
    treeEntry.setType(TreeEntry.TYPE_BLOB);
    treeEntry.setSha(blob_sha);
    treeEntry.setSize(blob.getContent().length());
    Collection<TreeEntry> entries = new ArrayList<TreeEntry>();
    entries.add(treeEntry);
    Tree newTree = dataService.createTree(repository, entries, baseTree.getSha());

    // create commit
    Commit commit = new Commit();
        commit.setMessage("first commit at " + new Date(System.currentTimeMillis()).toLocaleString());
    commit.setTree(newTree);

    UserService userService = new UserService( client );
    User user = userService.getUser();
    CommitUser author = new CommitUser();
    author.setName( user.getName() );
    Calendar now = Calendar.getInstance();
    author.setDate(now.getTime());
    commit.setAuthor(author);
    commit.setCommitter(author);


    List<Commit> listOfCommits = new ArrayList<Commit>();
    listOfCommits.add(new Commit().setSha(baseCommitSha));
    // listOfCommits.containsAll(base_commit.getParents());
    commit.setParents(listOfCommits);
    // commit.setSha(base_commit.getSha());
    Commit newCommit = dataService.createCommit(repository, commit);

    // create resource
    TypedResource commitResource = new TypedResource();
    commitResource.setSha(newCommit.getSha());
    commitResource.setType(TypedResource.TYPE_COMMIT);
    commitResource.setUrl(newCommit.getUrl());

    // get master reference and update it
    Reference reference = dataService.getReference(repository, "heads/master");
        reference.setObject(commitResource);
        dataService.editReference(repository, reference, true);
        System.out.println("Committed URL: "+ newCommit.getUrl());
    return false;    
}  
*/
 
}
