package laplateforme.guildboard.model;
import laplateforme.guildboard.model.enums.*;




import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity

public class Character {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private CharacterStatus status = CharacterStatus.READY;

    @Size(min = 2)
    @NotNull(message = "Name is required")
    private String name;


    private CharacterGender gender;
    private CharacterClass characterClass;
    private int lvl = 0;
    private int xp = 0;
    private int wallet = 0;
    private short completedQuest;
    private short totalQuest;





public Character() {
}
//--- Getters and Setters ---


//ID
public Long getId() {
    return id;
}
public void setId(Long id) {
    this.id = id;
}


//Status
public CharacterStatus getStatus() {
    return status;
}
public void setStatus(CharacterStatus status) {
    this.status = status;
}


//Name
public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}


//Gender
public CharacterGender getGender() {
    return gender;
}
public void setGender(CharacterGender gender) {
    this.gender = gender;
}


//Class
public CharacterClass getCharacterClass() {
    return characterClass;
}
public void setCharacterClass(CharacterClass characterClass) {
    this.characterClass = characterClass;
}


//Lvl
public int getLvl() {
    return lvl;
}
public void setLvl(int lvl) {
    this.lvl = lvl;
}


//XP
public int getXp() {
    return xp;
}
public void setXp(int xp) {
    this.xp = xp;
}


//Wallet
public int getWallet() {
    return wallet;
}
public void setWallet(int wallet) {
    this.wallet = wallet;
}


//Completed Quest
public short getCompletedQuest() {
    return completedQuest;
}
public void setCompletedQuest(short completedQuest) {
    this.completedQuest = completedQuest;
}


//Total Quest
public short getTotalQuest() {
    return totalQuest;
}
public void setTotalQuest(short totalQuest) {
    this.totalQuest = totalQuest;
}
}